export interface FgPartModalProps {
    open: boolean;
    initialValue?: string;
    onConfirm: (value: string) => void;
    onClose?: () => void;
}
