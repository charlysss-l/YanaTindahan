import { Link } from "react-router-dom"
const Sales = () => {
  return (
    <div>Sales
        <Link to="/create-sales">Create Sales</Link>

        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Total Sales</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              <tr>
               {/*<td>{name}</td>
                <td>{quantity}</td>
                <td>{totalsale}</td> */}
                <td>
                  <button>Update</button>
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Sales