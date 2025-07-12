import RedirectButton from '@/components/RedirectButton';
import StateManagement from '@/components/StateManagement';
import { DIRECTION } from '@/types/Direction';

export default function StateManagementPage() {
  return (
    <div className="relative mx-auto flex min-h-screen flex-col items-center justify-center space-y-4 px-4 text-center md:px-0">
      <RedirectButton
        href="/test"
        direction={DIRECTION.BACK}
        label="Test Page"
        className="absolute top-4 left-4"
      />
      <h1 className="text-3xl font-bold">State Management</h1>
      <StateManagement />
    </div>
  );
}
