import { useSelector, useDispatch } from 'react-redux';
import { greet, sayBye } from '../redux/reducers/buttons';
import Navbar from '../components/Navbar';

function App() {
  const greetings = useSelector((state) => state.greeting.greet);
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  console.log(user);
  return (
    <div className="App">
      <Navbar />
      <p className="text-6xl font-bold text-center text-secondaryBlueColor sm:text-3xl sm:px-6 sm:py-6">
        Ecommerce Legends
      </p>
      <p className="text-center">
        {user.user !== undefined && user.user !== null
          ? user.user.email
          : 'not logged in'}
      </p>
      <div className="mt-9">
        <h1 className="text-gray-600 mx-4">
          The following is a demostration of redux toolkit so it must be wiped
          later
        </h1>
        <span className="mx-9 px-3 bg-blue-400 text-white rounded-md">
          {greetings}
        </span>
        <button
          type="button"
          className="mx-9 px-3 bg-green-400 text-white rounded-md"
          aria-label="Increment value"
          onClick={() => dispatch(greet())}
        >
          greet
        </button>
        <button
          type="button"
          className="px-3 bg-red-400 text-white rounded-md"
          aria-label="Decrement value"
          onClick={() => dispatch(sayBye())}
        >
          say bye
        </button>
      </div>
    </div>
  );
}

export default App;
