export interface Iglesia {
    id?: string;
    name: string;
    email: string;
    direccion: string;
    telefonos: string;
    created_at?: Date;
    updated_at?: Date | null;
}