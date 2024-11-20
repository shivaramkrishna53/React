export default function Stats({ itemslst }) {
  let totalItemscount = itemslst.length;
  let itemspackedcount = itemslst.filter((x) => x.packed).length;
  let itemspackedper = Math.round((itemspackedcount / totalItemscount) * 100);

  if (!itemslst.length)
    return (
      <p className="stats">
        <em>You'r bag is empty start adding items👜</em>
      </p>
    );

  return (
    <footer className="stats">
      <em>
        {itemspackedper === 100
          ? "You have got everything! Ready to go ✈️"
          : `You have ${totalItemscount} items on you List,and you have already
        packed ${itemspackedcount} (${itemspackedper}%)👜`}
      </em>
    </footer>
  );
}
