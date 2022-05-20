import { useState } from "react";
import {
  Typography,
  Button,
  Collapse,
  TextField,
  Select,
  MenuItem,
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import toast from 'react-hot-toast';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';


const validationSchema = Yup.object().shape({
 link: Yup.string()
        .matches(
            /((https?):\/\/)+(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'لینک اشتباه است.'
        )
        .required('لینک اجباری است.')
});


export default function AddItemComponent({refetchData}) {

  const [type, setType] = useState("توییتر");

  const [openAddForm, setOpenAddForm] = useState(false);
  const handleOpenAddForm = () => setOpenAddForm(prevState => !prevState);
  const handleCloseAddForm = () => setOpenAddForm(false);

  const formik = useFormik({
    initialValues: {
      link: "",
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
          refetchData();
        }

      } catch {
        // Toast
        toast.error('تکراریست.', {
          position: 'bottom-right',
          iconTheme: {
            primary: '#FFF',
            secondary: '#D32F2F',
          },
          className: 'toast',
          style: {
            width: '200px',
            height: '30px',
            background: '#D32F2F',
            color: '#FFF',
            fontSize: '14px',
            fontWeight: 'bold'
          }
        });
      }

    }
  });

  return (
    <Box>
      <Typography variant="overline" display="block">
        مسیر های ارتباطی
      </Typography>

      <Button disabled={openAddForm} variant="text" sx={{ my: 2 }} onClick={handleOpenAddForm}>
        افزودن مسیر ارتباطی
      </Button>

      {/* Collapse */}

      <Collapse in={openAddForm}>
        <Card
          sx={{ backgroundColor: "rgba(244, 246, 248)", p: 2 }}
          elevation={0}
        >
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <Typography variant="body2" display="block" sx={{mb: 2}}>
                افزودن مسیر ارتباطی {type}
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="type-select-label">نوع</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={type}
                    label="نوع"
                    onChange={(event: SelectChangeEvent) =>
                      setType(event.target.value as string)
                    }
                  >
                    <MenuItem value={"توییتر"}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <span>توییتر</span>
                          <TwitterIcon />
                      </Box>
                    </MenuItem>
                  
                    <MenuItem value={"اینستاگرام"}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <span>اینستاگرام</span>
                          <InstagramIcon />
                      </Box>
                    </MenuItem>
                    <MenuItem value={"فیسبوک"}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <span>فیسبوک</span>
                          <FacebookIcon />
                      </Box>
                    </MenuItem>
                    <MenuItem value={"تلگرام"}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <span>تلگرام</span>
                          <TelegramIcon />
                      </Box>
                    </MenuItem>
                    <MenuItem value={"لینکدین"}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <span>لینکدین</span>
                          <LinkedInIcon />
                      </Box>
                    </MenuItem>
                    <MenuItem value={"وبسایت"}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <span>وبسایت</span>
                          <PublicIcon />
                      </Box>
                    </MenuItem>
                  
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
                ثبت مسیر ارتباطی
              </Button>
            </CardActions>
          </form>
        </Card>
      </Collapse>

    </Box>
  );
}