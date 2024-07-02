"use client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect, useState } from "react";

const SetupPage = () => {
  const [] = useState();

  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
