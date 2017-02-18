<template>

<div class="container">
    <div id="app">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="branding">
                    <img class="logo" src="./assets/logo.png">
                    <h2>Vue.js <sup class="badge">v2</sup> Directive for Server-Side form Validation with Laravel and Bootstrap.</h2>
                    <p>by <a href="http://www.qcode.in" target="_blank">QCode.in</a></p>

                    <hr>

                    <p>You just need to add <code>v-ajax-submit</code> on a ordinary laravel form to make it fully ajaxy &amp; interactive.</p>
                    </img>
                </div>
            </div>
        </div>
        <!-- end branding -->

        <div class="row">
            <div class="col-md-6">
                <form @success="successQuery" action="http://localhost:3888" method="post" v-ajax-submit>
                    <fieldset>
                        <!-- Form Name -->
                        <legend>
                            Query Form
                        </legend>
                        <!-- Text input-->
                        <div class="form-group">
                            <label for="name">
                                Name
                            </label>
                            <input class="form-control" id="name" name="name" placeholder="Your Name" type="text">
                            </input>
                        </div>
                        <!-- Text input-->
                        <div class="form-group">
                            <label for="email">
                                Email
                            </label>
                            <input class="form-control" id="email" name="email" placeholder="Your Email" type="text">
                            </input>
                        </div>
                        <!-- Text input-->
                        <div class="form-group">
                            <label for="subject">
                                Subject
                            </label>
                            <input class="form-control" id="subject" name="subject" placeholder="Subject" type="text">
                            </input>
                        </div>
                        <!-- Textarea -->
                        <div class="form-group">
                            <label for="query">
                                Query
                            </label>
                            <textarea class="form-control" id="query" name="query" placeholder="Your Query">
                            </textarea>
                        </div>
                        <!-- Button -->
                        <div class="form-group">
                            <label for="submit">
                            </label>
                            <input class="btn btn-primary" type="submit" value="Submit" />
                        </div>
                    </fieldset>
                </form>
            </div>

            <div class="col-md-6">

                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="media" v-for="comment in comments">
                            <div class="media-left media-middle">
                                <a href="#">
                                    <img class="media-object" width="62" :src="avatar(comment.comment_name)" :alt="comment.comment_name">
                                </a>
                            </div>
                            <div class="media-body">
                                <h5 class="media-heading">{{ comment.comment_name }}</h5>
                                <p>{{ comment.comment }}</p>
                                <form @success="commentDeleted" action="http://localhost:3888" method="post" v-ajax-submit>
                                    <input type="hidden" name="_method" value="DELETE">
                                    <input type="submit" name="delete" value="X" class="btn-delete btn btn-xs btn-danger" data-loading-text="Deleting...">
                                </form>
                            </div>
                        </div>
                        <!-- end comments -->
                        <div v-show="comments.length === 0" class="text-center">No Comments</div>
                    </div>
                </div>


                <form @success="addComment" action="http://localhost:3888" method="post" v-ajax-submit>
                    <fieldset>
                        <!-- Form Name -->
                        <legend>
                            Your Comment
                        </legend>
                        <!-- Textarea -->
                        <div class="form-group">
                            <label for="comment">
                                Comment
                            </label>
                            <textarea class="form-control" id="comment" name="comment" placeholder="Your comment...">
                            </textarea>
                        </div>
                        <!-- Text input-->
                        <div class="form-group">
                            <label for="comment_name">
                                Name
                            </label>
                            <input class="form-control" id="comment_name" name="comment_name" placeholder="Your Name" type="text">
                            </input>
                        </div>
                        <!-- Button -->
                        <div class="form-group">
                            <label for="submit">
                            </label>
                            <input class="btn btn-success" type="submit" data-loading-text="Commenting..." value="Comment" />
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
    <!-- end #app vue el -->
</div>

</template>

<script>

export default {
    name: 'app',
    data() {
        return {
            comments: [{
                comment_name: "Delete Request Demo",
                comment: "Sure, you can delete me. that button on right is going to destroy me...😒 dont worry I will be back on page refresh 😜"
            }]
        }
    },
    methods: {
        avatar(name) {
                return 'https://api.adorable.io/avatars/62/' + name.toString().toLowerCase().trim().replace(/[\s\W-]+/g, '-') + '@adorable.io.png'
            },

            // Handlers 
            addComment(res) {
                this.comments.push(res.body);
            },

            commentDeleted() {
                this.comments.splice(0, 1);

                swal('Deleted', 'Comment has been deleted.', 'info');
            },

            successQuery(res) {
                swal('Submitted', 'Your query has been submitted.', 'success');
            }
    }
}

</script>

<style>

body {
    padding-bottom: 4em;
    background-color: #f9f9f9;
}

#app .branding {
    text-align: center;
    padding: 2em;
}

.branding h2 {
    color: #929292;
    text-shadow: 1px 1px 2px #ddd;
}

.branding h2 .badge {
    text-shadow: none;
}

.logo {
    width: 100px;
}

.media {
    margin-bottom: 1em;
}

.btn-delete {
    position: absolute;
    top: 0;
    right: 15px;
}

</style>