import { useEffect, useState } from "react";
import { Modal, Input, Select, Button } from "antd";

import type { NewUser, UserType } from "../../types/user";

/* ================= TYPES ================= */

type Mode = "add" | "edit" | "reset";

type Props = {
  open: boolean;
  mode: Mode;
  user?: UserType | null;

  onClose: () => void;
  onSubmit: (data: NewUser[], mode: Mode) => void;
};

const { Option } = Select;

const roles = ["Admin", "Super Admin", "Operator"];

/* ================= COMPONENT ================= */

const UserModal = ({
  open,
  mode,
  user,
  onClose,
  onSubmit,
}: Props) => {
  /* ---------- State ---------- */

  const emptyUser: NewUser = {
    user_email: "",
    user_name: "",
    user_password: "",
    user_access: "",
  };

  const [forms, setForms] = useState<NewUser[]>([emptyUser]);

  /* ---------- Init ---------- */

  useEffect(() => {
    if ((mode === "edit" || mode === "reset") && user) {
      setForms([
        {
          user_email: user.user_email || "",
          user_name: user.user_name || "",
          user_password: "",
          user_access: user.user_access || "",
        },
      ]);
    }

    if (mode === "add") {
      setForms([emptyUser]);
    }
  }, [mode, user]);

  /* ---------- Helpers ---------- */

  const update = (
    index: number,
    field: keyof NewUser,
    value: string
  ) => {
    setForms((prev) => {
      const copy = [...prev];

      copy[index] = {
        ...copy[index],
        [field]: value,
      };

      return copy;
    });
  };

  const addMore = () => {
    setForms((p) => [...p, { ...emptyUser }]);
  };

  const remove = (index: number) => {
    setForms((p) => p.filter((_, i) => i !== index));
  };

  /* ---------- Validation ---------- */

  const validate = () => {
    for (const f of forms) {
      if (!f.user_email || !f.user_password) {
        return "Email & Password required";
      }

      if (mode !== "reset") {
        if (!f.user_name || !f.user_access) {
          return "All fields required";
        }
      }
    }

    return null;
  };

  /* ---------- Submit ---------- */

  const submit = () => {
    const error = validate();

    if (error) {
      Modal.error({
        title: "Validation Error",
        content: error,
      });
      return;
    }

    onSubmit(forms, mode);
  };

  /* ================= UI ================= */

  return (
    <Modal
      open={open}
      centered
      destroyOnHidden
      width={550}
      onCancel={onClose}
      onOk={submit}
      okText={
        mode === "add"
          ? "Add"
          : mode === "edit"
          ? "Update"
          : "Reset"
      }
      styles={{
    body: {
      maxHeight: "70vh",
      overflowY: "auto",
    },
  }}

      title={
        mode === "add"
          ? "Add User"
          : mode === "edit"
          ? "Edit User"
          : "Reset Password"
      }
    >
      <div className="space-y-6 mt-4">

        {/* MULTIPLE FORMS */}
        {forms.map((form, i) => (
          <div
            key={i}
            className="  space-y-4"
          >
            {/* HEADER */}
            {mode === "add" && forms.length > 1 && (
              <div className="flex justify-between items-center">

                <p className="font-medium text-gray-700">
                  User {i + 1}
                </p>

                <Button
                  danger
                  size="small"
                  onClick={() => remove(i)}
                >
                  Remove
                </Button>

              </div>
            )}

            {/* NAME */}
            {mode !== "reset" && (
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Name
                </label>

                <Input
                  value={form.user_name}
                  onChange={(e) =>
                    update(i, "user_name", e.target.value)
                  }
                  placeholder="Enter name"
                />
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Email
              </label>

              <Input
                disabled={mode !== "add"}
                value={form.user_email}
                onChange={(e) =>
                  update(i, "user_email", e.target.value)
                }
                placeholder="Enter email"
              />
            </div>

            {/* ROLE */}
            {mode !== "reset" && (
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Role
                </label>

                <Select
                  value={form.user_access || undefined}
                  onChange={(v) =>
                    update(i, "user_access", v)
                  }
                  className="w-full"
                  placeholder="Select role"
                >
                  {roles.map((r) => (
                    <Option key={r} value={r}>
                      {r}
                    </Option>
                  ))}
                </Select>
              </div>
            )}

            {/* PASSWORD */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                {mode === "reset"
                  ? "New Password"
                  : "Password"}
              </label>

              <Input.Password
                value={form.user_password}
                onChange={(e) =>
                  update(
                    i,
                    "user_password",
                    e.target.value
                  )
                }
                placeholder="Enter password"
              />
            </div>

          </div>
        ))}

        {/* ADD MORE */}
        {mode === "add" && (
          <Button
            type="dashed"
            block
            onClick={addMore}
          >
            + Add Another User
          </Button>
        )}

      </div>
    </Modal>
  );
};

export default UserModal;
