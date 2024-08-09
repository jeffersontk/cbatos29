// /schemas/user.js

export default {
  name: "userTeam",
  title: "User team",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(50),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: "password",
      title: "Password",
      type: "string",
      hidden: true,
    },
    {
      name: "role",
      title: "role",
      type: "string",
      options: {
        list: [
          { title: "admin", value: "admin" },
          { title: "comun", value: "comun" },
        ],
      },
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    },
  ],
}
