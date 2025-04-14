//
//  Tickets.swift
//  MovieNest
//
//  Created by Samanyu on 27/02/25.
//

import SwiftUI

struct Tickets: View {
    @State private var animate = false
    @State var tickets: [TicketModel] = TicketData.allTickets.map {
        TicketModel(image: $0.0, title: $0.1, subtitle: $0.2, top: $0.3, bottom: $0.4)
        
    }


    var body: some View {
        ZStack {
            ForEach(tickets) { ticket in
                InfiniteStackView(tickets: $tickets, ticket: ticket)
            }
        }
        .padding()
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
        .onAppear {
            withAnimation(.easeInOut(duration: 7).repeatForever(autoreverses: true)) {
                animate.toggle()
            }
        }
    }
}

struct Tickets_Previews: PreviewProvider {
    static var previews: some View {
        Tickets()
    }
}

struct InfiniteStackView: View {
    @Binding var tickets: [TicketModel]
    var ticket: TicketModel
    
    @GestureState private var isDragging: Bool = false
    @State private var offset: CGFloat = .zero
    
    var body: some View {
        VStack {
            Ticket(title: ticket.title, subtitle: ticket.subtitle, top: ticket.top, bottom: ticket.bottom)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .zIndex(Double(tickets.count) - getIndex())
        .rotationEffect(.degrees(getRotation(angle: 20)))
        .rotationEffect(getIndex() == 1 ? .degrees(-6) : .degrees(0))
        .rotationEffect(getIndex() == 2 ? .degrees(6) : .degrees(0))
        .scaleEffect(getIndex() == 0 ? 1 : 0.9)
        .offset(x: getIndex() == 1 ? -40 : 0)
        .offset(x: getIndex() == 2 ? 40 : 0)
        .offset(x: offset)
        .gesture(
            DragGesture()
                .updating($isDragging) { _, out, _ in
                    out = true
                }
                .onChanged { value in
                    guard tickets.first?.id == ticket.id else { return }
                    withAnimation(.easeInOut(duration: 0.3)) {
                        offset = value.translation.width
                    }
                }
                .onEnded { value in
                    let width = UIScreen.main.bounds.width
                    let threshold = width / 2
                    let swipedRight = offset > threshold
                    let swipedLeft = offset < -threshold
                    
                    withAnimation(.easeInOut(duration: 0.5)) {
                        if swipedRight {
                            offset = width
                            removeAndAdd()
                        } else if swipedLeft {
                            offset = -width
                            removeTicket()
                        } else {
                            offset = .zero
                        }
                    }
                }
        )
    }

    func getIndex() -> CGFloat {
        CGFloat(tickets.firstIndex(where: { $0.id == ticket.id }) ?? 0)
    }

    func getRotation(angle: Double) -> Double {
        let width = UIScreen.main.bounds.width
        return Double((offset / width) * angle)
    }

    func removeAndAdd() {
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
            var newTicket = ticket
            newTicket.id = UUID().uuidString
            tickets.append(newTicket)
            
            withAnimation(.spring()) {
                tickets.removeFirst()
            }
        }
    }

    func removeTicket() {
        withAnimation(.spring()) {
            tickets.removeFirst()
        }
    }
}
