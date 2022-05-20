import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Collapse,
  TextField,
  Select,
  MenuItem,
  Grid,
  Box,
  Modal,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  Link
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';


const validationSchema = Yup.object().shape({
 link: Yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'لینک اشتباه است.'
        )
        .required('لینک اجباری است.')
});


export default function ItemsComponent({itemData, getItemType}) {

	const {type, link} = itemData;

  const [typeText, setTypeText] = useState(type as string);

  const [openAddForm, setOpenAddForm] = useState(false);
  const handleOpenAddForm = () => setOpenAddForm(prevState => !prevState);
  const handleCloseAddForm = () => setOpenAddForm(false);

  const formik = useFormik({
    initialValues: {
      link,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      try {
        const {data, status} = await axios({
          method: "post",
          url: "http://localhost:3000/api/postItem",
          data: {
            type,
            link: values.link
          }
        });

        if (data.isSuccess === true && status === 200) {
          console.log('Submitted');
        }

      } catch {
        console.log('Error');
      }

    }
  });

  const typeIconChecker = () => {
  	switch(type) {
  		case "توییتر":
  			return <TwitterIcon />;
  		case "اینستاگرام":
  			return <InstagramIcon />;
  		case "فیسبوک":
  			return <FacebookIcon />;
  		case "تلگرام":
  			return <TelegramIcon />;
  		case "لینکدین":
  			return <LinkedInIcon />;
  		case "وبسایت":
  			return <PublicIcon />;
  	}
  }

	return (
    <Box
      sx={{
        backgroundColor: "rgba(244, 246, 248)",
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        my: 2
      }}
    >

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          p: 2
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
        	<Box sx={{
					    display: 'flex',
					    alignItems: 'center',
					    flexWrap: 'wrap',
					    gap: 1
					}}>
						{typeIconChecker()}
	          <Typography variant="body1" display="inline-block">
	            {type}
	          </Typography>
          </Box>

          <Typography variant="caption" display="inline-block">
            لینک:
          </Typography>
					<Link href={link} target="blank">
						{link}
					</Link>
        </Box>

        <Box>
          <Button disabled={openAddForm} variant="text" onClick={handleOpenAddForm}>ویرایش</Button>
          <Button variant="text" onClick={() => getItemType(type)}>
            حذف
          </Button>
        </Box>
      </Box>

      {/* Collapse */}

      <Collapse in={openAddForm}>
        <Card
          sx={{ backgroundColor: "rgba(244, 246, 248)", p: 2 }}
          elevation={0}
        >
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <Typography variant="body2" display="block" sx={{mb: 2}}>
                ویرایش مسیر ارتباطی {typeText}
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="type-select-label">نوع</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={typeText}
                    label="نوع"
                    onChange={(event: SelectChangeEvent) =>
                      setTypeText(event.target.value as string)
                    }
                  >
                    <MenuItem sx={{justifyContent: "flex-end"}} value={"توییتر"}>توییتر</MenuItem>
                    <MenuItem sx={{justifyContent: "flex-end"}} value={"اینستاگرام"}>اینستاگرام</MenuItem>
                    <MenuItem sx={{justifyContent: "flex-end"}} value={"فیسبوک"}>فیسبوک</MenuItem>
                    <MenuItem sx={{justifyContent: "flex-end"}} value={"تلگرام"}>تلگرام</MenuItem>
                    <MenuItem sx={{justifyContent: "flex-end"}} value={"لینکدین"}>لینکدین</MenuItem>
                    <MenuItem sx={{justifyContent: "flex-end"}} value={"وبسایت"}>وبسایت</MenuItem>
                  </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    id="link"
                    name="link"
                    label="لینک"
                    sx={{input: {textAlign: "right"}}}
                    value={formik.values.link}
                    onChange={formik.handleChange}
                    error={formik.touched.link && Boolean(formik.errors.link)}
                    helperText={formik.touched.link && formik.errors.link}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
              <Button type="reset" size="small" variant="outlined" onClick={() => {
                formik.resetForm();
                handleCloseAddForm();
              }}>
                انصراف
              </Button>
              <Button size="small" variant="contained" type="submit">
                ویرایش مسیر ارتباطی
              </Button>
            </CardActions>
          </form>
        </Card>
      </Collapse>

    </Box>
	);
}