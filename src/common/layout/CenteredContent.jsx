export default function CenteredContent({ children, ...props }) {
    return (
        <div class="flex ...">
            <div class="flex-1 h-16">
            </div>
            <div class="flex-shrink-0 h-16 w-5/6 ...">
                {props.centeredComponent}
            </div>
            <div class="flex-1 h-16">
            </div>
        </div>
    )
}