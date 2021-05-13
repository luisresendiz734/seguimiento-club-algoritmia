import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const AdminPendingCard = ({
  upload,
  handleAcceptProblem,
  setCurrentImage,
  setOpen,
}) => {
  const classes = useStyles();
  const { username, image, problemId, id } = upload;
  const handleShowImage = () => {
    setCurrentImage(image);
    setOpen(true);
  };
  return (
    <Card>
      <CardActionArea onClick={handleShowImage}>
        <CardMedia className={classes.media} image={image} title={id} />
        <CardContent>
          <Typography variant="body2" component="p">
            Username:{" "}
            <Typography variant="body2" color="textSecondary" component="span">
              {username}
            </Typography>
          </Typography>
          <Typography variant="body2" component="p">
            Problem:{" "}
            <Typography variant="body2" color="textSecondary" component="span">
              {problemId}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => handleAcceptProblem(username, problemId, id)}
        >
          Accept
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => handleAcceptProblem(username, problemId, id, true)}
        >
          Decline
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdminPendingCard;
