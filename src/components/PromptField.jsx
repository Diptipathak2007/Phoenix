import { motion } from 'framer-motion';
import { Iconbtn } from './Button';
import { useRef, useCallback, useState, useEffect } from 'react';
import { useNavigation, useSubmit, useParams, useLoaderData } from 'react-router-dom';

const PromptField = () => {
  const inputField = useRef();
  const inputFieldContainer = useRef();

  const submit = useSubmit();
  const navigation = useNavigation();
  const { conversationId } = useParams();
  const loaderData = useLoaderData() || {};
  const chats = loaderData.chats || []; // safe fallback
  const lastPrompt = chats.length ? chats[chats.length - 1].user_prompt : '';

  const [inputValue, setInputValue] = useState(lastPrompt);
  const [placeholderShown, setPlaceholderShown] = useState(!lastPrompt);
  const [isMultiLine, setIsMultiLine] = useState(false);

  // Set contentEditable innerText on mount
  useEffect(() => {
    if (inputField.current && lastPrompt) {
      inputField.current.innerText = lastPrompt;
    }
  }, [lastPrompt]);

  const moveCursorToEnd = useCallback(() => {
    const editableElem = inputField.current;
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(editableElem);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }, []);

  const handleInputChange = useCallback(() => {
    const text = inputField.current.innerText.trim();
    setPlaceholderShown(!text);
    setIsMultiLine(inputFieldContainer.current.clientHeight > 64);
    setInputValue(text);
  }, []);

  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();
      inputField.current.innerText += e.clipboardData.getData('text');
      handleInputChange();
      moveCursorToEnd();
    },
    [handleInputChange, moveCursorToEnd]
  );

  const handleSubmit = useCallback(() => {
    if (!inputValue || navigation.state === 'submitting') return;

    submit(
      {
        user_prompt: inputValue,
        request_type: 'user_prompt'
      },
      {
        method: 'POST',
        encType: 'application/x-www-form-urlencoded',
        action: `${conversationId || ''}`
      }
    );

    // Clear input after submission
    inputField.current.innerHTML = '';
    setInputValue('');
    setPlaceholderShown(true);
  }, [inputValue, navigation.state, submit, conversationId]);

  const promptFieldVariant = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
        duration: 0.4,
        delay: 0.4,
        ease: [0.05, 0.7, 0.1, 1]
      }
    }
  };

  const promptFieldChildrenVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <motion.div
      className={`prompt-field-container ${isMultiLine ? 'rounded-large' : ''}`}
      variants={promptFieldVariant}
      initial="hidden"
      animate="visible"
      ref={inputFieldContainer}
    >
      <motion.div
        className={`prompt-field ${placeholderShown ? '' : 'after:hidden'}`}
        contentEditable={true}
        role="textbox"
        aria-multiline={true}
        aria-label="Enter a prompt here"
        data-placeholder="Enter a prompt here"
        variants={promptFieldChildrenVariant}
        ref={inputField}
        onInput={handleInputChange}
        onPaste={handlePaste}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <Iconbtn
        icon="send"
        title="Submit"
        size="large"
        classes="ms-auto"
        variants={promptFieldChildrenVariant}
        onClick={handleSubmit}
      />
      <div className="state-layer"></div>
    </motion.div>
  );
};

export default PromptField;
