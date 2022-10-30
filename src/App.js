import { useState, useEffect} from "react";
import Axios from "axios" ;

function App() {

  const [listOfIdeas, setListOfIdeas] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect( () => {
    Axios.get("https://ideas-app-server.herokuapp.com/getIdeas").then((response) => {
      setListOfIdeas(response.data);
    });
  }, []);

  const createIdea = () => {
    Axios.post("https://ideas-app-server.herokuapp.com/createIdea", {
      name,
      title,
      description,
    }).then(
      Axios.get("https://ideas-app-server.herokuapp.com/getIdeas").then((response) => {
      setListOfIdeas(response.data);
    })
    );
  };

  const UpdateIdea = (id) => {
    const newDescription = prompt("Enter new description: ");

    Axios.put("https://ideas-app-server.herokuapp.com/updateIdea", {newDescription: newDescription, id: id}).then(
      () => {
        setListOfIdeas(
          listOfIdeas.map((val) => {
            return val._id === id 
              ? { _id: id , name:val.name , title:val.title , description: newDescription}
              : val ;
          })
        );
      }
    );
  };

  const deleteIdea = (id) => {
    Axios.delete(`https://ideas-app-server.herokuapp.com/delete/${id}`).then(() => {
      setListOfIdeas(
        listOfIdeas.filter((val) => {
          return val._id !== id ;
        })
      );
    });
  };

  return (
    <div className="container-fuild">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          
          <div className="p-5">
          <h4 className="mx-2">Ideas App Demo</h4>
            <input type="text" className="border border-success m-2 p-1" placeholder="Name..." onChange={(event) =>{
              setName(event.target.value);
            }} />
            <input type="text" className="border border-success m-2 p-1"  placeholder="Idea Title..." onChange={(event) =>{
              setTitle(event.target.value);
            }} />
            <input type="text" className="border border-success m-2 p-1" placeholder="Idea Description..." onChange={(event) =>{
              setDescription(event.target.value);
            }} />
            <button className="btn btn-success mx-1 px-5 " onClick={createIdea}>Add Idea</button>
          </div> 
        </div>
      </div>

      <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="py-2 px-5  my-1" >
                {listOfIdeas.map((idea) => {
                  return(
                    <div className="bg-success my-2 py-2 px-4 rounded " key={idea._id}>
                      
                      <h6>Name : {idea.name}</h6>
                      <h6>Title : {idea.title}</h6>
                      <h6>Description : {idea.description}</h6>
                      <button className="btn btn-primary m-1" onClick={() => {
                        UpdateIdea(idea._id);
                      }}>Update</button>
                      <button className="btn btn-danger m-1" onClick={() => {
                        deleteIdea(idea._id);
                      }}>Delete</button>
                    </div>
                  )
                })}
              </div>
            </div>
      </div>
    </div>
  );
}

export default App;
