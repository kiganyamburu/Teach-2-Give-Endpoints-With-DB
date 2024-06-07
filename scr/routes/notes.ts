import { Router } from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
} from "../controllers/notesController";

const router = Router();

router.post("/notes", createNote);
router.get("/notes", getAllNotes);
router.get("/notes/:id", getNoteById);
router.put("/notes/:id", updateNoteById);
router.delete("/notes/:id", deleteNoteById);

export default router;
