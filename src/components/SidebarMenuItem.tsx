import { LucideIcon } from 'lucide-react';

interface SidebarMenuItemProps {
  id: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: (id: string) => void;
}

export default function SidebarMenuItem({ id, label, icon: Icon, isActive, onClick }: SidebarMenuItemProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center space-x-3 py-3 px-3 btn-rounded transition-colors relative text-left ${
        isActive 
          ? 'bg-white text-gray-800' 
          : 'text-gray-300 hover:text-white hover:bg-gray-800'
      }`}
    >
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-r"></div>
      )}
      <Icon size={20} className={isActive ? 'text-gray-800' : ''} />
      <span className={isActive ? 'text-gray-800 font-medium' : ''}>{label}</span>
    </button>
  );
}