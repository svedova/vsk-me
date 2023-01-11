import { Routes, Route, RouteProps } from "react-router-dom";

interface Props {
  routes: RouteProps[];
}

const Error404: React.FC = () => {
  return <div>Page is not found</div>;
};

const App: React.FC<Props> = ({ routes }) => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} {...route}></Route>
      ))}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default App;
