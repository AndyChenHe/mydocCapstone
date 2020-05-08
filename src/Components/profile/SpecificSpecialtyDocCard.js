import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Box from "@material-ui/core/Box";
import docImg from "../../img/results/docAlex.png";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 230,
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  likeBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
      alignItems: "flex-start",
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 20,
    },
  },
}));

//This card is imported in HospSpecialtyDetailedInfo.js

// Each indiivdual doctor card
// 这个和TopRatedDocCard是一样的，除了名字下面放了years of practice (toprated的是放了specialty)
export default function TopRatedDocCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {/* doctor image */}
            <div style={{ width: 100, height: 150 }}>
              <CardMedia
                component="img"
                className={classes.img}
                image={docImg}
              ></CardMedia>
            </div>
            {/* doctor details */}
            <Typography variant="body1" color="primary">
              Dr. Alex Leow
            </Typography>
            <br></br>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              align="center"
            >
              <strong>Years of Practice: </strong> <span>7</span>
            </Typography>
            <br></br>
            {/* Like icon + number of likes */}
            <Box className={classes.likeBox}>
              <FavoriteIcon style={{ color: "red" }} />
              <Typography variant="body2" color="primary">
                100
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
