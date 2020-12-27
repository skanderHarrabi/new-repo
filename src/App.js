import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import List from './components/List/List';
import store from './utils/store';
import StoreApi from './utils/storeApi';
import InputContainer from './components/Input/InputContainer';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TopBar from './components/TopBar';
import firebase from './utils/firebase';
import './App.css';

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: 'white',
    width: '100%',
    overflowY: 'auto',
  },
  listContainer: {
    display: 'flex',
  },
  main: {
    textAlign: 'center',
  }
}));

export default function App() {
  const [data, setData] = useState(store);
  const [open, setOpen] = useState(false);
  const [test, setTest] = useState();

  // useEffect(() => {
  //   const listRef = firebase.database().ref('lists');

  //   listRef.on('value', (snapshot) => {
  //     const lists = snapshot.val();
  //     const listsTab = [];
  //     for (let id in lists) {
  //       listsTab.push({ ...lists[id], idBase: id })
  //     }
  //     console.log(listsTab, snapshot.val());
  //     const listIds = listsTab.map(e => e.id);
  //     console.log(listIds)
  //     let listsData = {};
  //     listsTab.map(({ id, title, idBase }) => {
  //       let newData = {
  //         id,
  //         title,
  //         idBase,
  //         cards: []
  //       }
  //       listsData = {
  //         ...listsData,
  //         [id]: newData
  //       }
  //     })
  //     console.log("eeeeeeeeeeeeeeeeeeee", listsData)
  //     setData({ ...data, lists: listsData, listIds: listIds });
  //   });
  // }, [])

  const [backgroundUrl, setBackgroundUrl] = useState('');
  const classes = useStyle();


  const addMoreCard = (title, dueDate, listId) => {
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
      dueDate
    };
    const list = data.lists[listId];
    console.log('listt', list)
    list.cards = [...list.cards, newCard];
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const addMoreList = (title) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: [],
    };
    // const listRef = firebase.database().ref("lists");
    // const list = {
    //   id: newListId,
    //   title,
    //   cards: [],
    // }
    // listRef.push(list);
    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
    };
    console.log(newState);
    setData(newState);
  };

  const updateListTitle = (title, listId) => {
    const list = data.lists[listId];
    list.title = title;

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log('destination', destination, 'source', source, draggableId);

    if (!destination) {
      return;
    }
    if (type === 'list') {
      const newListIds = data.listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);
      return;
    }

    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      const newSate = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList,
        },
      };
      setData(newSate);
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        },
      };
      setData(newState);
    }
  };

  console.log(data);
  return (
    <StoreApi.Provider value={{ addMoreCard, addMoreList, updateListTitle }}>
      <div
        className={classes.root}
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <TopBar setOpen={setOpen} />
        <div className="main">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="app" type="list" direction="horizontal">
              {(provided) => (
                <div
                  className={classes.listContainer}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {data.listIds.length > 0 && data.listIds.map((listId, index) => {
                    const list = data.lists[listId];
                    console.log('zzzzzzzzzzzzzzzzzzzz', listId, list)
                    return <List list={list} key={listId} index={index} />;
                  })}
                  <InputContainer type="list" />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* <SideMenu
          setBackgroundUrl={setBackgroundUrl}
          open={open}
          setOpen={setOpen}
        /> */}
      </div>
    </StoreApi.Provider>
  );
}
