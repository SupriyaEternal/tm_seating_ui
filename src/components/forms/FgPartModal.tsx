import { Modal } from "antd";
import { useEffect, useState } from "react";
import type { FgPartModalProps } from "../../types/data-collection";

const FgPartModal = ({
  open,
  initialValue = "",
  onConfirm,
  onClose,
}: FgPartModalProps) => {

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, open]);

  return (
    <Modal
      open={open}
      centered
      width={520}
      closable
      maskClosable={false}
      footer={null}
      onCancel={onClose}
      title={
        <div className="flex items-center gap-2 text-gray-800 font-semibold mb-4">
          <span className="w-1 h-5 bg-[#1E2D5B] rounded" />
          <span>Load Recipe</span>
        </div>
      }
    >

      <div className="flex flex-col gap-5">

        {/* Label + Input */}
        <div className="flex flex-col gap-2">

          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            FG Part Number
          </p>

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter FG Part Number"
            autoFocus
            className="
              w-full px-4 py-2.5 rounded-lg
              border border-gray-300
              text-gray-800 text-sm
              outline-none
              focus:border-[#1E2D5B]
              transition
            "
          />

        </div>


        {/* Footer */}
        <div className="flex justify-between pt-4 border-t border-gray-200">

          {/* Left */}
          <div className="flex gap-3">

            <button
              onClick={() => {
                setValue("");
                onClose?.();
              }}
              className="
                px-4 py-2 rounded-md
                text-sm font-medium
                border border-red-400
                text-red-400
                hover:bg-red-50
                transition cursor-pointer
              "
            >
              Cancel
            </button>

            <button
              onClick={() => setValue("")}
              className="
                px-4 py-2 rounded-md
                text-sm font-medium
                border border-red-400
                text-red-400
                hover:bg-red-50
                transition cursor-pointer
              "
            >
              Clear
            </button>

          </div>


          {/* Right */}
          <button
            disabled={!value.trim()}
            onClick={() => {
              if (!value.trim()) return;
              onConfirm(value.trim());
            }}
            className={`
              px-6 py-2.5 rounded-md
              text-sm font-semibold
              text-white
              transition 
              ${
                value.trim()
                  ? "bg-[#1E2D5B] hover:bg-[#162146] cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              }
            `}
          >
            Load Recipe
          </button>

        </div>

      </div>

    </Modal>
  );
};

export default FgPartModal;
