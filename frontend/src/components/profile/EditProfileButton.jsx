import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';

const EditProfileButton = () => (
  <Link
    to="/settings/profile"
    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
  >
    <Pencil className="w-4 h-4" />
    Edit Profile
  </Link>
);

export default EditProfileButton;
