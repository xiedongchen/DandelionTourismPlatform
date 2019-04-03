<template>
  <div id="app">
    <router-view/>
    <!-- <breadcrumb />
    <Charts />
    <dndlist />
    <DragSelect />
    <Dropzone /> -->
  </div>
</template>

<script>
import breadcrumb from './components/Breadcrumb/index'
import Charts from './components/Charts/mixChart'
import dndlist from './components/DndList/index'
import DragSelect from './components/DragSelect/index'
import Dropzone from './components/Dropzone/index'
export default{
  name: 'App',
  components: {
    breadcrumb,
    Charts,
    dndlist,
    DragSelect,
    Dropzone
  }
}
</script>
