import ListComponent from "../components/ListComponent";

const ListPage = () => {
  const list = ["ed", "Tut", "Seg", "Sav"];
  return (
    <div className="list-page-container">
      <ListComponent listHeading="Today's List" listOfItems={list} />
    </div>
  );
};

export default ListPage;
