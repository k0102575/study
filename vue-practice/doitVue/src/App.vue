<template>
  	<div id="app">
		<TodoHeader></TodoHeader>
		<TodoInput v-on:addTodo="addTodo"></TodoInput>
		<TodoList v-bind:propsdata="todoItems" @removeTodo="removeTodo"></TodoList>
		<TodoFooter v-on:removeAll="clearAll"></TodoFooter>
	</div>
</template>

<script>

import TodoHeaderVue from './components/TodoHeader.vue';
import TodoFooterVue from './components/TodoFooter.vue';
import TodoListVue from './components/TodoList.vue';
import TodoInputVue from './components/TodoInput.vue';

export default {
	data() {
		return {
			todoItems: []
		}
	},
	created() {
        this.localStorageToVueData()
    },
	methods: {
		localStorageToVueData() {
            let _localStorage = localStorage
            if (_localStorage.length > 0) {
                for (var i = 0; i < _localStorage.length; i++) {
                    this.todoItems.push(_localStorage.key(i))
                }
            }
		},
		addTodo(todoItem) {
			localStorage.setItem(todoItem, todoItem)
			this.todoItems.push(todoItem);
		},
		removeTodo(todoItem, index) {
            localStorage.removeItem(todoItem)
            this.todoItems.splice(index, 1);
        },
		clearAll() {
			localStorage.clear();
			this.todoItems = [];
		}
	},
	components: {
    	'TodoHeader' : TodoHeaderVue,
    	'TodoFooter' : TodoFooterVue,
    	'TodoList' : TodoListVue,
    	'TodoInput' : TodoInputVue 
  	}
}

</script>

<style>
	body {
		text-align : center;
		background-color : #F6F6F8;
	}

	input {
		border-style : groove;
		width : 200px;
	}

	button {
		border-style : groove;
	}

	.shadow {
		box-shadow : 5px 10px 10px rgba(0, 0, 0, 0.03);
	}
</style>