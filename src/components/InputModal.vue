<!-- src/components/InputModal.vue -->
<template>
    <ion-modal :is-open="isOpen" @did-dismiss="cancel">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ editingId ? 'Edit' : 'Add' }} Toy Story</ion-title>
                <ion-buttons slot="start">
                    <ion-button @click="cancel"><ion-icon :icon="close"></ion-icon></ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item>
                <ion-input v-model="localtoystory.toy" label="Toy" label-placement="floating"
                    placeholder="Enter the Name of Toy"></ion-input>
            </ion-item>
            <ion-item>
                <ion-textarea v-model="localtoystory.story" label="Story" label-placement="floating"
                    placeholder="Enter the Story abotu this Toy." :autogrow="true" :rows="3"></ion-textarea>
            </ion-item>

            <ion-row>
                <ion-col>
                    <ion-button type="button" @click="input" shape="round" color="primary" expand="block">
                        {{ editingId ? 'Edit' : 'Add' }} Toy Story
                    </ion-button>
                </ion-col>
            </ion-row>
        </ion-content>
    </ion-modal>
</template>
<script setup lang="ts">
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonInput, IonRow, IonCol, IonItem, IonContent, IonTextarea } from '@ionic/vue';
import { close } from 'ionicons/icons';
import { toystory } from '@/utils/firestore';
import { ref } from 'vue';
import { watch } from 'vue';

const props = defineProps<{
    isOpen: boolean,
    editingId: string | null,
    toystory: Omit<toystory, 'id' | 'createdAt' | 'updatedAt' | 'status'>
}>();

const emit = defineEmits<{
    'update:isOpen': [value: boolean],
    'update:editingId': [value: string | null],
    'submit': [item: Omit<toystory, 'id' | 'createdAt' | 'updatedAt' | 'status'>]
}>();

const localtoystory = ref({ ...props.toystory });

const cancel = () => {
    emit('update:isOpen', false);
    emit('update:editingId', null);
    localtoystory.value = { toy: '', story: '' };
};

const input = () => {
    emit('submit', localtoystory.value);
    cancel();
};

watch(
    () => props.toystory,
    (newtoystory) => {
        localtoystory.value = { ...newtoystory };
    }
);

</script>