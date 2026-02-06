import type { NewUser, UserType } from "../../types/user";

const mockUsers: UserType[] = [
  {
    user_id: "1",
    user_name: "Demo Admin",
    user_email: "admin@tm.com",
    user_access: "Super Admin",
  },
  {
    user_id: "2",
    user_name: "Operator 1",
    user_email: "operator1@tm.com",
    user_access: "Operator",
  },
  {
    user_id: "3",
    user_name: "Supervisor",
    user_email: "supervisor@tm.com",
    user_access: "Supervisor",
  },
];

export const getUsers = async () => ({ data: mockUsers });

export const addUser = async (data: NewUser) => {
  mockUsers.push({
    user_id: `${Date.now()}`,
    user_name: data.user_name,
    user_email: data.user_email,
    user_access: data.user_access,
  });
  return { data: true };
};

export const updateUser = async (id: string, data: NewUser) => {
  const idx = mockUsers.findIndex((u) => u.user_id === id);
  if (idx >= 0) {
    mockUsers[idx] = {
      ...mockUsers[idx],
      user_name: data.user_name,
      user_email: data.user_email,
      user_access: data.user_access,
    };
  }
  return { data: true };
};

export const resetPassword = async (_data: any) => ({ data: true });

export const deleteUser = async (email: string) => {
  const idx = mockUsers.findIndex((u) => u.user_email === email);
  if (idx >= 0) {
    mockUsers.splice(idx, 1);
  }
  return { data: true };
};
