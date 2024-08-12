export const userRole = {
    ADMIN: "admin",
     USER: "user",
} as const;

export type TUserRole = (typeof userRole)[keyof typeof userRole];


