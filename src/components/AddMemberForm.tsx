import '../css/add-member-form.css';

interface ListItems{
    item:string [];
}

const AddMemberForm = (itemsToAdd :ListItems) => {

    const handleSubmit = (itemFromForm:string)=>{
        if (itemFromForm.trim() === '') return;
        itemsToAdd.item.push(itemFromForm);
    }

  return (
    <div className="add-member-form-container">
        <h2 className="add-member-form-title">Add Member Form</h2>
        <form className="add-member-form" onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const inputField = form.inputField.value;
            handleSubmit(inputField);
            form.reset();
        }}>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="type item to add" 
                    name="inputField"
                />
            </div>
            <button className="add-member-btn" type="submit">Submit</button>
            <button className="cancel-btn" type="button">Cancel</button>
        </form>
    </div>
  )
}

export default AddMemberForm
