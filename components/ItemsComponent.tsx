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
  Link,
  Paper,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useFormik } from "formik";
import * as Yup from "yup";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PublicIcon from "@mui/icons-material/Public";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const validationSchema = Yup.object().shape({
  link: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "لینک اشتباه است."
    )
    .required("لینک اجباری است."),
});

export default function ItemsComponent({
  itemData,
  getItemType,
  getItemUpdateValues,
}) {
  const { type, link } = itemData;

  const [typeText, setTypeText] = useState(type as string);

  const [openAddForm, setOpenAddForm] = useState(false);

  const handleOpenAddForm = () => setOpenAddForm((prevState) => !prevState);
  const handleCloseAddForm = () => setOpenAddForm(false);

  const formik = useFormik({
    initialValues: {
      link,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      getItemUpdateValues({
        type: typeText,
        link: values.link,
        prevType: type,
      });
    },
  });

  const typeIconChecker = () => {
    switch (type) {
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
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        my: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
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
          <Button
            disabled={openAddForm}
            variant="text"
            onClick={handleOpenAddForm}
            startIcon={<EditIcon />}
          >
            ویرایش
          </Button>
          <Button
            variant="text"
            onClick={() => getItemType(type)}
            color="error"
            startIcon={<DeleteIcon />}
          >
            حذف
          </Button>
        </Box>
      </Box>

      {/* Collapse */}

      <Collapse in={openAddForm}>
        <Card sx={{ p: 2 }} elevation={0}>
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <Typography variant="body2" display="block" sx={{ mb: 2 }}>
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
                      <MenuItem
                        value={"توییتر"}
                        sx={{ justifyContent: "flex-end" }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <span>توییتر</span>
                          <TwitterIcon />
                        </Box>
                      </MenuItem>

                      <MenuItem
                        value={"اینستاگرام"}
                        sx={{ justifyContent: "flex-end" }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <span>اینستاگرام</span>
                          <InstagramIcon />
                        </Box>
                      </MenuItem>
                      <MenuItem
                        value={"فیسبوک"}
                        sx={{ justifyContent: "flex-end" }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <span>فیسبوک</span>
                          <FacebookIcon />
                        </Box>
                      </MenuItem>
                      <MenuItem
                        value={"تلگرام"}
                        sx={{ justifyContent: "flex-end" }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <span>تلگرام</span>
                          <TelegramIcon />
                        </Box>
                      </MenuItem>
                      <MenuItem
                        value={"لینکدین"}
                        sx={{ justifyContent: "flex-end" }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <span>لینکدین</span>
                          <LinkedInIcon />
                        </Box>
                      </MenuItem>
                      <MenuItem
                        value={"وبسایت"}
                        sx={{ justifyContent: "flex-end" }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
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
                    sx={{ input: { textAlign: "right" } }}
                    value={formik.values.link}
                    onChange={formik.handleChange}
                    error={formik.touched.link && Boolean(formik.errors.link)}
                    helperText={formik.touched.link && formik.errors.link}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Button
                type="reset"
                size="small"
                variant="outlined"
                onClick={() => {
                  formik.resetForm();
                  handleCloseAddForm();
                }}
              >
                انصراف
              </Button>
              <Button
                size="small"
                variant="contained"
                type="submit"
                disabled={link === formik.values.link && type === typeText}
              >
                ویرایش مسیر ارتباطی {typeText}
              </Button>
            </CardActions>
          </form>
        </Card>
      </Collapse>
    </Paper>
  );
}
