import { useLayoutEffect, useState, Fragment } from "react";
import {
  Paper,
  Box,
  Modal,
  Button,
  Typography
} from "@mui/material";
import axios from 'axios';
import {isEmpty} from 'lodash';
// import { TransitionGroup } from 'react-transition-group';
import AddItemComponent from '../components/AddItemComponent';
import ItemsComponent from '../components/ItemsComponent';


export default function Home() {

  const [allItems, setAllItems] = useState(null);

  const refetchData = () => {
    (async () => {
      try {
        const {data, status} = await axios({
          method: "get",
          url: "http://localhost:3000/api/getItems"
        });

        if (!isEmpty(data) && status === 200) {
          setAllItems(data);
        } else if (isEmpty([])) {
          setAllItems(null);
        }

      } catch {
        console.log('Error');
      }
    })();
  }

  useLayoutEffect(() => {

    refetchData();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const [itemTypeText, setItemTypeText] = useState(null);

  const getItemType = (itemType) => {
    setItemTypeText(itemType);
    handleModalOpen();
  }

  const handleDeleteItem = async () => {
    handleModalClose();
    
    try {
    
      const {data, status} = await axios({
        method: "delete",
        url: "http://localhost:3000/api/deleteItem",
        data: {
          type: itemTypeText
        }
      });

      if (data.isSuccess === true && status === 200) {

        refetchData();
      }

    } catch {
      console.log("Error");
    }
    
  }

  return (
    <Paper sx={{ width: 2 / 3, m: "40px auto", p: 4 }}>

      <AddItemComponent refetchData={refetchData} />

      {/*<TransitionGroup>*/}
      {
        allItems?.map((item, index) => (
          <Fragment key={index}>
            <ItemsComponent itemData={item} getItemType={getItemType} />
          </Fragment>
        ))
      }
      {/*</TransitionGroup>*/}

      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            backgroundColor: "#FFF",
            borderRadius: "10px",
            p: 4,
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "left" }}
          >
            آیا از تصمیم خود مطمئن هستید؟
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 1,
              mt: 4,
            }}
          >
            <Button variant="contained" onClick={handleDeleteItem}>حذف</Button>
            <Button variant="outlined" onClick={handleModalClose}>انصراف</Button>
          </Box>
        </Box>
      </Modal>

    </Paper>
  );
}
