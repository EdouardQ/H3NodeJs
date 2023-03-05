import jwt_decode from "jwt-decode";

const getRole = (req: any): string => {
    const token: string = req.header('Authorization').split(' ')[1] ?? null;

    if (token == null) {
        return 'none';
    }

    const decodedToken: any = jwt_decode(token);

    return decodedToken.sub.role ?? 'none';
};

export const isAdmin = (req: any, res: any, next: any) => {
    const role = getRole(req);

    if (role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }

    next();
}

export const isManager = (req: any, res: any, next: any) => {
    const role = getRole(req);

    if (role !== 'manager') {
        return res.status(403).json({ error: 'Forbidden' });
    }

    next();
}

export const isArtist = (req: any, res: any, next: any) => {
    const role = getRole(req);

    if (role !== 'artist') {
        return res.status(403).json({ error: 'Forbidden' });
    }

    next();
}
