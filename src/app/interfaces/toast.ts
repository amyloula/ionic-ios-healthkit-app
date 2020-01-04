interface ButtonConfig {
    side: string;
    icon: string;
    text: string;
    handler: () => void;
}

interface DoneConfig {
    text: string;
    role: string;
    handler: () => void;
}

export { ButtonConfig, DoneConfig};