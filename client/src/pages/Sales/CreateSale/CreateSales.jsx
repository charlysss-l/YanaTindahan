
const CreateSales = () => {
  return (
    <div>
      <h1>Create Sales</h1>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Name"
          //value={}
          //onChange={}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          //value={}
          //onChange={}
          required
        />
        <button>Add</button>
        <input
          type="number"
          name="sale"
          placeholder="Total Sales"
          //value={}
          //onChange={}
          required
        />
        
        <button>Submit Sales</button>
      </form>
    </div>
  )
}

export default CreateSales