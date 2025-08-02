// src/components/Avatar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { avatars } from '../lib/appwrite';

const Avatar = ({ name = '', userId }) => {
  // If Appwrite avatars API is available and userId is valid
  const imageUrl = userId ? avatars.getInitials(userId).href : null;

  const initials = name
    ? name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
    : 'U'; // fallback initials

  return (
    <figure className="avatar w-10 h-8 rounded-5xl bg-orange-400 grid place-items-center text-sm font-semibold text-gray-700 overflow-hidden">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        initials
      )}
    </figure>
  );
};

Avatar.propTypes = {
  name: PropTypes.string,
  userId: PropTypes.string
};

export default Avatar;
