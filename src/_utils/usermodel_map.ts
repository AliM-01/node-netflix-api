export function mapUser(user: any) {
    return {
        uid: user?._id,
        email: user?.email,
        username: user?.username,
        pfp: user?.pfp,
        isAdmin: user?.isAdmin
    }
}