import { Card, CardContent, Typography } from "@material-ui/core";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../utils/firebase";
import AdminPendingCard from "./AdminPendingCard";
import styles from "./AdminPendingCard.module.css";
import ShowImage from "./ShowImage";

const PendingList = ({ user = null }) => {
  const uploadsRef = firestore.collection("uploads");
  const huronesRef = firestore.collection("hurones");
  const [uploads] = useCollectionData(uploadsRef, { idField: "id" });
  const [hurones] = useCollectionData(huronesRef, { idField: "id" });
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const handleAcceptProblem = async (username, pid, uid, del = false) => {
    const huron = hurones.find((h) => h.username === username);
    const huronRef = huronesRef.doc(huron.id);
    const uploadRef = uploadsRef.doc(uid);
    if (del) {
      await uploadRef.delete();
      return;
    }
    huron.solved.push(pid);
    huronRef.set(
      {
        ...huron,
      },
      { merge: true }
    );
    await uploadRef.delete();
  };

  if (user) {
    return (
      <>
        <ShowImage image={currentImage} open={open} setOpen={setOpen} />
        <Typography
          style={{ marginTop: "2rem", marginBottom: "1rem" }}
          variant="h4"
        >
          Pending list
        </Typography>
        {uploads && uploads.length ? (
          <section className={styles.grid}>
            {uploads.map((up) => (
              <AdminPendingCard
                key={up.id}
                upload={up}
                handleAcceptProblem={handleAcceptProblem}
                setCurrentImage={setCurrentImage}
                setOpen={setOpen}
              />
            ))}
          </section>
        ) : (
          <Typography variant="h6">Empty</Typography>
        )}
      </>
    );
  }

  return (
    <>
      <Typography
        style={{ marginTop: "2rem", marginBottom: "1rem" }}
        variant="h4"
      >
        Pending list
      </Typography>
      {uploads && uploads.length ? (
        <section className={styles.grid}>
          {uploads.map(({ username, problemId, id }) => (
            <Card key={id}>
              <CardContent>
                <Typography variant="body1">
                  user: {username}, problem: {problemId}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </section>
      ) : (
        <Typography variant="h6">Empty</Typography>
      )}
    </>
  );
};

export default PendingList;
