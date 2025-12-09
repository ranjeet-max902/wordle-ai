import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContainer = styled(motion.div)`
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 2rem;
  min-width: 320px;
  max-width: 90%;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.25rem;
  line-height: 1;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;

const Title = styled.h2`
  margin: 0 0 1.5rem;
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
`;

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Use createPortal to render outside the main DOM hierarchy
    // Using document.body if window is defined
    if (typeof window === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            <Overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <ModalContainer
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                    {title && <Title>{title}</Title>}
                    {children}
                </ModalContainer>
            </Overlay>
        </AnimatePresence>,
        document.body
    );
};
