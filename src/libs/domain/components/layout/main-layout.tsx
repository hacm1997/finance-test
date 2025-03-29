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
    <div className="flex gap-10">
      <VerticalMenu isMenuOpen={isMenuOpen} />
      <div className="flex justify-center w-full p-8 mt-16">{children}</div>
    </div>
  );
}
