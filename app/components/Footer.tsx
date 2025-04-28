'use client';
import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <footer className="bg-gray-200 dark:bg-gray-800 py-4 px-6 flex items-center justify-between border-t border-gray-300 dark:border-gray-700">
      <div className="text-sm text-gray-700 dark:text-gray-300">
        © {new Date().getFullYear()} - Realizado por Diego Paredes 😁
      </div>
      <div className="flex items-center ml-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDarkMode}
            onChange={toggleTheme}
          />
          <div className="w-14 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-between px-1 peer-checked:bg-blue-600 transition-colors duration-300">
            <span className="text-yellow-400 text-lg">🌞</span>
            <span className="text-white text-lg">🌙</span>
          </div>
          <div className="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
        </label>
      </div>
    </footer>
  );
};

export default Footer;
