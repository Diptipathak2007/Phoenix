import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { hopscotch } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React from 'react';
import { iconlogo } from '../assets/assets';
import { Iconbtn } from './Button';
import { useState,useEffect,useCallback } from 'react';
import {useSnackbar} from '../hooks/useSnackbar'

const AiResponse = ({ aiResponse, children }) => {
  const { showSnackbar, hideSnackbar } = useSnackbar();
  const [codeTheme,setcodeTheme]=useState("")
  useEffect(()=>{
    const mediaQuery=window.matchMedia('(prefers-color-scheme:dark)')
    setcodeTheme(mediaQuery.matches?hopscotch:coy)
    const themeListener=mediaQuery.addEventListener('change',(event)=>{setcodeTheme(event.matches?hopscotch:coy)})
    return ()=>mediaQuery.removeEventListener('change',themeListener);
  },[])
  const handleCopy=useCallback(async(text)=>{
    try {
      await navigator.clipboard.writeText(text)
      showSnackbar({
        message:'copied to clipboard',
        timeOut:2500
      }

    )
    } catch (error) {
      showSnackbar({
        message:err.message
      })
      console.log(`Error copying text to clipboard:${err.message}`)
    }

  },[showSnackbar,hideSnackbar])
  
  const CodeBlock = ({ children, className, ...rest }) => {
    const match = className?.match(/language-(\w+)/);

    return match ? (
      <div className="overflow-hidden rounded-medium shadow-elevation2 border border-light-outline dark:border-dark-outline bg-light-surfaceContainer dark:bg-dark-surfaceContainer">
        
        {/* Header with language label */}
        <div className="px-4 py-2 text-bodySmall font-medium bg-light-surfaceContainerHigh dark:bg-dark-surfaceContainerHigh border-b border-light-outlineVariant dark:border-dark-outlineVariant">
          {match[1].toUpperCase()}
        </div>

        {/* Code syntax highlighter */}
        <SyntaxHighlighter
          {...rest}
          PreTag="div"
          language={match[1]}
          style={codeTheme}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
          }}
          codeTagProps={{
            style: {
              display: 'block',
              padding: '16px',
              fontWeight: 500,
            },
          }}
        >
          {children}
        </SyntaxHighlighter>

        {/* Footer caution bar */}
        <div className="flex justify-between items-center px-4 py-2 text-bodySmall bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow border-t border-light-outlineVariant dark:border-dark-outlineVariant">
          <span>
            Use code{' '}
            <a
              className="text-light-primary dark:text-dark-primary underline hover:opacity-80"
              href="https://gemini.google.com/faq#coding"
              target="_blank"
              rel="noreferrer"
            >
              with caution
            </a>.
          </span>
          <Iconbtn icon="content_copy" size="small" title="Copy code" onClick={handleCopy.bind(null,children)} />
        </div>
      </div>
    ) : (
      <code className={className}>{children}</code>
    );
  };

  return (
    <div className="grid grid-cols-1 items-start gap-4 py-4 md:grid-cols-[max-content,minmax(0,1fr)] md:gap-5">
      {/* Logo */}
      <figure className="w-8 h-8 grid place-items-center">
        <img src={iconlogo} width={32} height={32} alt="Phoenix logo" />
      </figure>

      {/* Text + Markdown content */}
      <div className="markdown-content">
        {children}
        <Markdown remarkPlugins={[remarkGfm]} components={{ code: CodeBlock }}>
          {aiResponse}
        </Markdown>
      </div>
    </div>
  );
};

AiResponse.propTypes = {
  aiResponse: PropTypes.string,
  children: PropTypes.any,
};

export default AiResponse;
