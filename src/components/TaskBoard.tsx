import { Badge, Flex, Grid } from "@radix-ui/themes"

export const TaskBoard: React.FC = () => {

    const tasksTOdo: Task[] = [
        {
      "id": 2,
      "title": "Reunião com a equipe",
      "description": "Reunião para discutir o progresso do projeto e próximos passos.",
      "status": "todo",
      "priority": "high"
    }
    ]
    const tasksInProgress: Task[] = [
           {
      "id": 1,
      "title": "Enviar relatório",
      "description": "Enviar o relatório mensal para o departamento financeiro.",
      "status": "doing",
      "priority": "high"
    }
    ]
    const tasksDone: Task[] = [
         {
      "id": 3,
      "title": "Atualizar o site",
      "description": "Fazer atualizações no site da empresa com novas informações.",
      "status": "done",
      "priority": "medium"
    }
    ]

  return (
    <Grid columns="3" gap="4" minWidth={"64rem"}>

        <Flex direction="column" gap="4">
            <Badge size="3" color="gray">
                Para fazer (2)
            </Badge>
        </Flex>

        <Flex direction="column" gap="4">
             <Badge size="3" color="amber">
                Em progresso (2)
            </Badge>
        </Flex>

        <Flex direction="column" gap="4">
             <Badge size="3" color="green">
                Concluídas (2)
            </Badge>
        </Flex>

    </Grid>
  )
}