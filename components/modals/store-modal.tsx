import React from "react";
import Modal from "../ui/modal";
import { useStoreModal } from "@/hooks/use-store-modals";

const StoreModal = () => {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onClose = useStoreModal((state) => state.onClose);

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      Store Form
    </Modal>
  );
};

export default StoreModal;
