'use client';
import React, { useState } from 'react';
import { VerticalMenu } from './vertical-menu';

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <VerticalMenu isMenuOpen={isMenuOpen} />
      {children}
    </div>
  );
}
