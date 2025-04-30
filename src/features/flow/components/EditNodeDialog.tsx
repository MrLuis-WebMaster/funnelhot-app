'use client';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@mui/material';
import { useState, useEffect } from 'react';

type Props = {
    open: boolean;
    value: string;
    onClose: () => void;
    onSave: (val: string) => void;
};

export default function EditNodeDialog({ open, value, onClose, onSave }: Props) {
    const [temp, setTemp] = useState(value);

    useEffect(() => {
        setTemp(value);
    }, [value]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar nodo</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={() => onSave(temp)}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
