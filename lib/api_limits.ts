import { auth } from "@clerk/nextjs";
import prismadb from "./prismadatabase";
import { MAX_FREE_COUNTS } from "@/app/constants";

export const increaseLimit = async () => {
    const {userId} = auth();

    if (!userId){
        return;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (userApiLimit) {
        await prismadb.userApiLimit.update({
            where: { userId: userId},
            data: {count: userApiLimit.count + 1},
        });
    } else {
        await prismadb.userApiLimit.create({
            data: {userId: userId, count: 1}
        });
    }
}

export const checkLimit = async () => {

    const { userId } = auth();

    if(!userId){
        return false;
    }
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    });
    
    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
        return true;
    } else {
        return false;
    }

};

export const getLimitCount = async () => {
    const { userId } = auth();

    if(!userId){
        return 0;
    }
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (!userApiLimit) {
        return 0;
    } 

    return userApiLimit.count;

}

export const saveMessage = async (content: string, role: string) => {
    const { userId } = auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const message = await prismadb.chatMessages.create({
        data: {
            content,
            role,
            userId,
        },
    });

    return message;
};

export const getChatMessages = async () => {
    const { userId } = auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const messages = await prismadb.chatMessages.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    return messages;
};

export const getCodeMessages = async () => {
    const { userId } = auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const messages = await prismadb.codeMessage.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    return messages;
};

export const getImages = async () => {
    const { userId } = auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const messages = await prismadb.chatMessages.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    return messages;
};