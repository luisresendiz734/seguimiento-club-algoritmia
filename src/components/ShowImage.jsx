import { Dialog } from "@material-ui/core";

const ShowImage = ({ image, open, setOpen }) => {
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <img src={image} alt={image} />
    </Dialog>
  );
};
export default ShowImage;
