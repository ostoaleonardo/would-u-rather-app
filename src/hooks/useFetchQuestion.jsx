import 'react-native-url-polyfill/auto'
import { supabase } from '../utils/supabaseClient'

export const useFetchQuestion = () => {
    const getQuestionById = async (table, id) => {
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('id', id)

        if (error) {
            return null
        }

        return data[0]
    }

    const getVotesById = async (table, option, id) => {
        const { data, error } = await supabase
            .from(table)
            .select(option)
            .eq('id', id)

        if (error) {
            return null
        }

        return data[0]
    }

    const updateVotesById = async (table, option, id ) => {
        const votes = await getVotesById(table, option, id)

        const { data, error } = await supabase
            .from(table)
            .update({ [option]: votes[option] + 1 })
            .eq('id', id)
            .select()

        if (error) {
            return null
        }

        return data[0]
    }

    const sendSeggestion = async (option1, option2) => {
        const { data, error } = await supabase
            .from('suggestions')
            .insert([
                { option1: option1, option2: option2 },
            ])
            .select()

        if (error) {
            return error
        }

        return data
    }

    const loadQuestions = async (table, questions) => {
        const { data, error } = await supabase
            .from(table)
            .insert(questions)
            .select()

        if (error) {
            return error
        }

        return data
    }

    return {
        getQuestionById,
        updateVotesById,
        getVotesById,
        sendSeggestion,
        loadQuestions,
    }
}