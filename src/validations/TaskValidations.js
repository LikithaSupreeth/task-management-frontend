import * as Yup from 'yup';

export const taskValidations= Yup.object({
  title: Yup.string()
  .required('Title is required')
  .max(100, 'Title cannot be more than 100 characters'),
  description: Yup.string()
  .required('Description is required')
  .max(300, 'Description cannot be more than 300 characters'),
  priority: Yup.string()
  .required('Priority is required'),
  status: Yup.string()
  .required('Status is required'),
  dueDate: Yup.date()
  .required('Due date is required').nullable(),
  assignedUserId: Yup.string()
  .required('Assigned user ID is required'),
  userId:Yup.string()
  .required('Assigned user ID is required')
});
