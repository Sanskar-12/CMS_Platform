"use client";

import StoreModal from "@/components/modals/store-modal";
// This Provider is for making the code base hydration error free

import React, { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <StoreModal />;
};

export default ModalProvider;
