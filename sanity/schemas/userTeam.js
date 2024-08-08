// /schemas/user.js

export default {
  name: 'userTeam',
  title: 'User team',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(50)
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
      hidden: true
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true
    }
  ]
};
