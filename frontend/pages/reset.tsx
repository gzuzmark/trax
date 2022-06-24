import { useRouter } from 'next/router';
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage() {
  const { token } = useRouter().query;
  if (!token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>RESET YOUR PASSWORD</p>
      <Reset token={token} />
    </div>
  );
}
