import {STATE} from "./state";

export const MUTATION = {
    ADD_SOMEONES_DISCUSSIONS: 'add_someones_discussions',
    ADD_SOMEONES_COMMENTS   : 'add_someones_comments',
    ADD_SOMEONES_REPLIES    : 'add_someones_replies',

    ADD_DEBATE_CHOICE1_COMMENTS: 'add_debate_choice1_comments',
    ADD_DEBATE_CHOICE2_COMMENTS: 'add_debate_choice2_comments',

    ADD_LATEST_DISCUSSIONS: 'add_latest_discussions',
    ADD_MY_NOTIFICATIONS  : 'add_my_notifications',
    ADD_MY_DISCUSSIONS    : 'add_my_discussions',
    ADD_MY_COMMENTS       : 'add_my_comments',
    ADD_MY_REPLIES        : 'add_my_replies',

    DELETE_COMMENT     : 'delete_comment',
    UPDATE_COMMENT_BODY: 'update_comment_body',
    LIKE_COMMENT       : 'like_comment',

    INIT_COMMENT_DETAIL : 'init_comment_detail',
    ADD_COMMENT_DETAIL  : 'add_comment_detail',
    CLEAR_COMMENT_DETAIL: 'clear_comment_detail',

    INIT_REPLY_DETAIL : 'init_reply_detail',
    ADD_REPLY_DETAIL  : 'add_reply_detail',
    CLEAR_REPLY_DETAIL: 'clear_reply_detail',

    UPDATE_REPLY_BODY: 'update_reply_body',
    DELETE_REPLY     : 'delete_reply',
    LIKE_REPLY       : 'like_reply',

    OPEN_REPLY_MODAL : 'open_reply_modal',
    CLOSE_REPLY_MODAL: 'close_reply_modal',

    OPEN_REPLY_TO_REPLY_MODAL : 'open_reply_to_reply_modal',
    CLOSE_REPLY_TO_REPLY_MODAL: 'close_reply_to_reply_modal',
};

export default {
    [MUTATION.ADD_SOMEONES_DISCUSSIONS]: (state, payload) => {
        const discussions = state[STATE.SOMEONES_DISCUSSIONS].discussions;

        state[STATE.SOMEONES_DISCUSSIONS].discussions = discussions.concat(payload.items);
        state[STATE.SOMEONES_DISCUSSIONS].hasNext     = payload.hasNext;
    },

    [MUTATION.ADD_SOMEONES_COMMENTS]: (state, payload) => {
        const comments = state[STATE.SOMEONES_COMMENTS].comments;

        state[STATE.SOMEONES_COMMENTS].comments = comments.concat(payload.items);
        state[STATE.SOMEONES_COMMENTS].hasNext  = payload.hasNext;
    },

    [MUTATION.ADD_SOMEONES_REPLIES]: (state, payload) => {
        const replies = state[STATE.SOMEONES_REPLIES].replies;

        state[STATE.SOMEONES_REPLIES].replies = replies.concat(payload.items);
        state[STATE.SOMEONES_REPLIES].hasNext = payload.hasNext;
    },

    [MUTATION.ADD_DEBATE_CHOICE1_COMMENTS]: (state, payload) => {
        const comments = state[STATE.DEBATE_CHOICE1_COMMENTS].comments;

        state[STATE.DEBATE_CHOICE1_COMMENTS].comments = comments.concat(payload.items);
        state[STATE.DEBATE_CHOICE1_COMMENTS].hasNext  = payload.hasNext;
    },

    [MUTATION.ADD_DEBATE_CHOICE2_COMMENTS]: (state, payload) => {
        const comments = state[STATE.DEBATE_CHOICE2_COMMENTS].comments;

        state[STATE.DEBATE_CHOICE2_COMMENTS].comments = comments.concat(payload.items);
        state[STATE.DEBATE_CHOICE2_COMMENTS].hasNext  = payload.hasNext;
    },


    [MUTATION.ADD_LATEST_DISCUSSIONS]: (state, payload) => {
        const discussions = state[STATE.LATEST_DISCUSSIONS].discussions;

        state[STATE.LATEST_DISCUSSIONS].discussions = discussions.concat(payload.items);
        state[STATE.LATEST_DISCUSSIONS].hasNext     = payload.hasNext;
    },

    [MUTATION.ADD_MY_NOTIFICATIONS]: (state, payload) => {
        const notifications = state[STATE.MY_NOTIFICATIONS].notifications;

        state[STATE.MY_NOTIFICATIONS].notifications = notifications.concat(payload.items);
        state[STATE.MY_NOTIFICATIONS].hasNext       = payload.hasNext;
    },

    [MUTATION.ADD_MY_DISCUSSIONS]: (state, payload) => {
        const discussions = state[STATE.MY_DISCUSSIONS].discussions;

        state[STATE.MY_DISCUSSIONS].discussions = discussions.concat(payload.items);
        state[STATE.MY_DISCUSSIONS].hasNext     = payload.hasNext;
    },

    [MUTATION.ADD_MY_COMMENTS]: (state, payload) => {
        const comments = state[STATE.MY_COMMENTS].comments;

        state[STATE.MY_COMMENTS].comments = comments.concat(payload.items);
        state[STATE.MY_COMMENTS].hasNext  = payload.hasNext;
    },

    [MUTATION.ADD_MY_REPLIES]: (state, payload) => {
        const replies = state[STATE.MY_REPLIES].replies;

        state[STATE.MY_REPLIES].replies = replies.concat(payload.items);
        state[STATE.MY_REPLIES].hasNext = payload.hasNext;
    },

    [MUTATION.DELETE_COMMENT]: (state, payload) => {
        const commentID    = payload.commentID;
        const removeFilter = (comment) => {
            return comment.id !== commentID;
        };

        state[STATE.SOMEONES_COMMENTS].comments =
            state[STATE.SOMEONES_COMMENTS].comments.filter(removeFilter);

        state[STATE.DEBATE_CHOICE1_COMMENTS].comments =
            state[STATE.DEBATE_CHOICE1_COMMENTS].comments.filter(removeFilter);

        state[STATE.DEBATE_CHOICE2_COMMENTS].comments =
            state[STATE.DEBATE_CHOICE2_COMMENTS].comments.filter(removeFilter);

        state[STATE.MY_COMMENTS].comments =
            state[STATE.MY_COMMENTS].comments.filter(removeFilter);
    },

    [MUTATION.UPDATE_COMMENT_BODY]: (state, payload) => {
        const commentID = payload.commentID;
        const body      = payload.body;

        const updater = (comment) => {
            if (comment.id === commentID) {
                comment.body = body;
            }

            return comment;
        };

        state[STATE.SOMEONES_COMMENTS].comments =
            state[STATE.SOMEONES_COMMENTS].comments.map(updater);

        state[STATE.DEBATE_CHOICE1_COMMENTS].comments =
            state[STATE.DEBATE_CHOICE1_COMMENTS].comments.map(updater);

        state[STATE.DEBATE_CHOICE2_COMMENTS].comments =
            state[STATE.DEBATE_CHOICE2_COMMENTS].comments.map(updater);

        state[STATE.MY_COMMENTS].comments =
            state[STATE.MY_COMMENTS].comments.map(updater);
    },

    [MUTATION.LIKE_COMMENT]: (state, payload) => {
        const commentID = payload.commentID;

        const updater = (comment) => {
            if (comment.id === commentID) {
                comment.like_count++;
            }

            return comment;
        };

        state[STATE.SOMEONES_COMMENTS].comments =
            state[STATE.SOMEONES_COMMENTS].comments.map(updater);

        state[STATE.DEBATE_CHOICE1_COMMENTS].comments =
            state[STATE.DEBATE_CHOICE1_COMMENTS].comments.map(updater);

        state[STATE.DEBATE_CHOICE2_COMMENTS].comments =
            state[STATE.DEBATE_CHOICE2_COMMENTS].comments.map(updater);

        state[STATE.MY_COMMENTS].comments =
            state[STATE.MY_COMMENTS].comments.map(updater);
    },

    [MUTATION.INIT_COMMENT_DETAIL] : (state, payload) => {
        state[STATE.COMMENT_DETAIL_COMMENT_ID]  = payload.commentID;
        state[STATE.COMMENT_DETAIL]             = payload.detail;
        state[STATE.COMMENT_DETAIL_INITIALIZED] = true;
    },
    [MUTATION.ADD_COMMENT_DETAIL]  : (state, payload) => {
        const replies = state[STATE.COMMENT_DETAIL].replies;

        state[STATE.COMMENT_DETAIL].hasNext = payload.hasNext;
        state[STATE.COMMENT_DETAIL].replies = replies.concat(payload.replies);
    },
    [MUTATION.CLEAR_COMMENT_DETAIL]: (state, payload) => {
        state[STATE.COMMENT_DETAIL_INITIALIZED] = false;
    },

    [MUTATION.INIT_REPLY_DETAIL] : (state, payload) => {
        state[STATE.REPLY_DETAIL_REPLY_ID]    = payload.replyID;
        state[STATE.REPLY_DETAIL]             = payload.detail;
        state[STATE.REPLY_DETAIL_INITIALIZED] = true;
    },
    [MUTATION.ADD_REPLY_DETAIL]  : (state, payload) => {
        const children = state[STATE.REPLY_DETAIL].children;

        state[STATE.REPLY_DETAIL].hasNext  = payload.hasNext;
        state[STATE.REPLY_DETAIL].children = children.concat(payload.children);
    },
    [MUTATION.CLEAR_REPLY_DETAIL]: (state, payload) => {
        state[STATE.REPLY_DETAIL_INITIALIZED] = false;
    },

    [MUTATION.UPDATE_REPLY_BODY]: (state, payload) => {
        const replyID = payload.replyID;
        const body    = payload.body;

        const updater = (reply) => {
            if (reply.id === replyID) {
                reply.body = body;
            }

            return reply;
        };

        state[STATE.SOMEONES_REPLIES].replies =
            state[STATE.SOMEONES_REPLIES].replies.map(updater);

        state[STATE.MY_REPLIES].replies =
            state[STATE.MY_REPLIES].replies.map(updater);
    },

    [MUTATION.DELETE_REPLY]: (state, payload) => {
        const replyID = payload.replyID;

        const deleter = (reply) => {
            return reply.id !== replyID;
        };

        state[STATE.SOMEONES_REPLIES].replies =
            state[STATE.SOMEONES_REPLIES].replies.filter(deleter);

        state[STATE.MY_REPLIES].replies =
            state[STATE.MY_REPLIES].replies.filter(deleter);
    },

    [MUTATION.LIKE_REPLY]: (state, payload) => {
        const replyID = payload.replyID;

        const updater = (reply) => {
            if (reply.id === replyID) {
                reply.like_count++;
            }

            return reply;
        };

        state[STATE.SOMEONES_REPLIES].replies =
            state[STATE.SOMEONES_REPLIES].replies.map(updater);

        state[STATE.MY_REPLIES].replies =
            state[STATE.MY_REPLIES].replies.map(updater);
    },

    [MUTATION.OPEN_REPLY_MODAL]: (state, payload) => {
        const comment = payload.comment;

        state[STATE.REPLY_MODAL_OPENING] = true;
        state[STATE.REPLY_MODAL_COMMENT] = comment;
    },

    [MUTATION.CLOSE_REPLY_MODAL]: (state, payload) => {
        state[STATE.REPLY_MODAL_OPENING] = false;
        state[STATE.REPLY_MODAL_COMMENT] = null;
    },

    [MUTATION.OPEN_REPLY_TO_REPLY_MODAL]: (state, payload) => {
        const reply = payload.reply;

        state[STATE.REPLY_TO_REPLY_MODAL_OPENING] = true;
        state[STATE.REPLY_TO_REPLY_MODAL_REPLY]   = reply;
    },

    [MUTATION.CLOSE_REPLY_TO_REPLY_MODAL]: (state, payload) => {
        state[STATE.REPLY_TO_REPLY_MODAL_OPENING] = false;
        state[STATE.REPLY_TO_REPLY_MODAL_REPLY]   = null;
    },
}
